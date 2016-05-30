package com.aem.eaga.servlet;

import com.google.common.io.ByteStreams;
import com.google.common.io.OutputSupplier;
import com.aem.eaga.Context;
import com.aem.eaga.servlet.commands.ContextCommand;
import com.aem.eaga.servlet.commands.HttpMethodEnum;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

import javax.servlet.ServletException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

public abstract class StrategyContextServlet extends ContextServlet {

    private Map<String, ContextCommand> strategies;

    @Override
    public void init() throws ServletException {
        super.init();
        strategies = new HashMap<>();
        initStrategies();
    }

    protected abstract void initStrategies();

    protected void perform(final Context context) throws IOException {
        String selectors = getSelector(context);
        String[] selectorList = selectors.split("\\.");
        ContextCommand command = strategies.get(selectorList[0]);
        HttpMethodEnum method = HttpMethodEnum.valueOf(getMethod(context).toUpperCase());
        if (command != null && command.isSupported(method)) {
            command.process(context);
        } else {
            SlingHttpServletResponse response = context.getRequestWrapper().getSlingResponse();
            response.setStatus(500);
            response.setContentType("plain/text");
            write(response, String.format("Unknown selector '%s' or wrong HTTP method '%s'", selectorList, getMethod(context)));
        }

    }

    @Override
    public void onDelete(Context context) throws JSONException, IOException {
        perform(context);
    }

    @Override
    public void onPut(Context context) throws JSONException, IOException {
        perform(context);
    }

    @Override
    public void onPost(Context context) throws JSONException, IOException {
        perform(context);
    }

    @Override
    public void onGet(Context context) throws JSONException, IOException {
        perform(context);
    }

    public void write(final SlingHttpServletResponse response, JSONObject data) throws IOException {
        write(response, data, 200);
    }

    public void write(final SlingHttpServletResponse response, JSONObject data, int httpStatus) throws IOException {
        response.setStatus(httpStatus);
        response.setContentType("application/json");
        write(response, data.toString());
    }

    public void addStrategy(String startegyName, ContextCommand command) {
        strategies.put(startegyName, command);
    }

    public void write(final SlingHttpServletResponse response, String data, int httpStatus) throws IOException {
        response.setStatus(httpStatus);
        response.setContentType("text/html");
        write(response, data);
    }

    public void write(final SlingHttpServletResponse response, String data) throws IOException {
        response.setCharacterEncoding("UTF-8");
        byte[] bytes = data.getBytes("UTF-8");
        response.setContentLength(bytes.length);
        ByteStreams.write(data.getBytes("UTF-8"), new OutputSupplier<OutputStream>() {
            @Override
            public OutputStream getOutput() throws IOException {
                return response.getOutputStream();
            }
        });
    }

}
