package com.aem.eaga.servlet;

import com.day.cq.wcm.api.LanguageManager;
import com.google.common.base.Preconditions;
import com.google.common.base.Strings;
import com.google.common.io.CharStreams;
import com.aem.eaga.Context;
//import gr.vodafone.aem.api.portal.customer.Customer;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.jcr.api.SlingRepository;

import javax.servlet.ServletException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@Component(componentAbstract = true)
public class ContextServlet extends SlingAllMethodsServlet {

    @Reference
    private SlingRepository repository;

    @Reference
    private LanguageManager languageManager;

   


    protected static String readBodyToString(SlingHttpServletRequest request) throws IOException {
        try (BufferedReader reader = request.getReader()) {
            return CharStreams.toString(reader);
        }
    }

    @Override
    protected final void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        try {
            onGet(getContextInstance(request, response));
        } catch (JSONException e) {
            throw new ServletException(e);
        }
    }

    private Context getContextInstance(SlingHttpServletRequest request, SlingHttpServletResponse response) {
        return new Context(request, response, languageManager);
    }

    public void onGet(Context context) throws JSONException, IOException {
    }

    @Override
    protected final void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        try {
            onPost(getContextInstance(request, response));
        } catch (JSONException e) {
            throw new ServletException(e);
        }
    }

    public void onPost(Context context) throws JSONException, IOException {
    }

    @Override
    protected final void doPut(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        try {
            onPut(getContextInstance(request, response));
        } catch (JSONException e) {
            throw new ServletException(e);
        }
    }

    public void onPut(Context context) throws JSONException, IOException {
    }

    @Override
    protected final void doDelete(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        try {
            onDelete(getContextInstance(request, response));
        } catch (JSONException e) {
            throw new ServletException(e);
        }
    }

    public void onDelete(Context context) throws JSONException, IOException {
    }

    public JSONObject getBody(SlingHttpServletRequest request) throws IOException, JSONException {
        return new JSONObject(ContextServlet.readBodyToString(request));
    }

    protected RenderHandler reply(SlingHttpServletResponse context) {
        return new RenderHandler(context);
    }

    public String getSelector(Context context) {
        return context.getSlingRequest().getRequestPathInfo().getSelectorString();
    }

    public String getMethod(Context context) {
        return context.getSlingRequest().getMethod();
    }

    public interface WriteHandler {
        void withWriter(PrintWriter writer);
    }

    protected static class RenderHandler {

        protected final SlingHttpServletResponse response;
        private String contentType;

        public RenderHandler(SlingHttpServletResponse response) {
            this.response = response;
        }

        public void json(final JSONObject jsonObject) throws IOException {
            contentType = "application/json";
            handle(new WriteHandler() {
                @Override
                public void withWriter(PrintWriter writer) {
                    writer.append(jsonObject.toString());
                }
            });
        }

        public void json(final JSONArray jsonObject) throws IOException {
            contentType = "application/json";
            handle(new WriteHandler() {
                @Override
                public void withWriter(PrintWriter writer) {
                    writer.append(jsonObject.toString());
                }
            });
        }

        public void handle(WriteHandler writeHandler) throws IOException {
            Preconditions.checkNotNull(!Strings.isNullOrEmpty(contentType), "you MUST set a content type");
            response.setContentType(contentType);
            try (PrintWriter writer = response.getWriter()) {
                writeHandler.withWriter(writer);
                writer.flush();
            }
        }

    }

}
