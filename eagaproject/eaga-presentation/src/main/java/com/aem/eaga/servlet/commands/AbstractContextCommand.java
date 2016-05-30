package com.aem.eaga.servlet.commands;

import com.google.common.io.ByteStreams;
import com.google.common.io.OutputSupplier;
import com.aem.eaga.Context;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.OutputStream;

public abstract class AbstractContextCommand implements ContextCommand {

    protected final Logger logger = LoggerFactory.getLogger(getClass());

    private final HttpMethodEnum[] methods;

    public AbstractContextCommand() {
        this.methods = HttpMethodEnum.values();
    }

    public AbstractContextCommand(HttpMethodEnum... methods) {
        this.methods = methods;
    }

    @Override
    public boolean isSupported(HttpMethodEnum method) {
        return ArrayUtils.contains(this.methods, method);
    }


    public void write(final Context context, JSONObject data) throws IOException {
        write(context, data, 200);
    }

    public void write(final Context context, JSONObject data, int httpStatus) throws IOException {
        SlingHttpServletResponse response = context.getSlingResponse();
        response.setStatus(httpStatus);
        response.setContentType("application/json");
        write(context, data.toString());
    }

    public void write(final Context context, String data) throws IOException {
        SlingHttpServletResponse response = context.getSlingResponse();
        response.setCharacterEncoding("UTF-8");
        byte[] bytes = data.getBytes("UTF-8");
        response.setContentLength(bytes.length);
        ByteStreams.write(data.getBytes("UTF-8"),
                new OutputSupplier<OutputStream>() {
                    @Override
                    public OutputStream getOutput() throws IOException {
                        return context.getSlingResponse().getOutputStream();
                    }
                }
        );
    }
}