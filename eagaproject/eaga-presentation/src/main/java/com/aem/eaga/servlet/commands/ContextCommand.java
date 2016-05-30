package  com.aem.eaga.servlet.commands;

import com.aem.eaga.Context;

import java.io.IOException;

public interface ContextCommand {

    void process(Context context) throws IOException;

    boolean isSupported(HttpMethodEnum method);

}
