/*
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.

 * For more information, please refer to <http://unlicense.org/>
 */
package com.aem.eaga.api.portal.customer;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;

import java.util.Map;

public interface Customer {

    public String getCustomerName(String customerId);
 

    public Map<String, String> getCustomer(String token, String username, String password);

    public void sendLoginRequest(String username, String password);

    public String getToken(String username, String password);

    public boolean isAuthenticated(SlingHttpServletRequest request);

    public String getCustomerID(SlingHttpServletRequest request);

    public void login(SlingHttpServletResponse response, String url);
    
    public boolean setSessionToken(String token, String userid);
     
}
