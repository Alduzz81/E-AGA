package com.aem.eaga.api.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.rmi.ServerException;
import java.util.Dictionary;
import java.util.Calendar;
import java.io.*;
  
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.commons.osgi.OsgiUtil;
import org.apache.sling.jcr.api.SlingRepository;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.felix.scr.annotations.Reference;
import org.osgi.service.component.ComponentContext;
import javax.jcr.Session;
import javax.jcr.Node;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import javax.jcr.ValueFactory;
import javax.jcr.Binary;
   
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileOutputStream;
import java.util.Iterator;
import java.util.List;
import java.io.OutputStream; 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
    
import java.io.StringWriter;
  
import java.util.ArrayList;
    
import javax.jcr.Repository;
import javax.jcr.SimpleCredentials;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
     
import org.apache.jackrabbit.commons.JcrUtils;
  
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
  
    
import javax.jcr.Session;
import javax.jcr.Node;
  
//Sling Imports
import org.apache.sling.api.resource.ResourceResolverFactory ;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.Resource;

import com.aem.eaga.servlet.products.commands.InsertProductImageCommand;
//AssetManager
import com.day.cq.dam.api.AssetManager; 
  
//This is a component so it can provide or consume services
@SlingServlet(paths="/bin/updamfile", methods = "POST", metatype=true)
public class HandleDamFile extends SlingAllMethodsServlet {
 private static final long serialVersionUID = 2598426539166789515L;
        
 private Session session;
       
 //Inject a Sling ResourceResolverFactory
 @Reference
 private ResourceResolverFactory resolverFactory;
  
       
 @Override
 protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServerException, IOException {
         
      try
         {
         final boolean isMultipart = org.apache.commons.fileupload.servlet.ServletFileUpload.isMultipartContent(request);
         PrintWriter out = null;
           
           out = response.getWriter();
           if (isMultipart) {
             final java.util.Map<String, org.apache.sling.api.request.RequestParameter[]> params = request.getRequestParameterMap();
             for (final java.util.Map.Entry<String, org.apache.sling.api.request.RequestParameter[]> pairs : params.entrySet()) {
               final String k = pairs.getKey();
               final org.apache.sling.api.request.RequestParameter[] pArr = pairs.getValue();
               final org.apache.sling.api.request.RequestParameter param = pArr[0];
               final InputStream stream = param.getInputStream();
                
               		//save the uploaded file in the DB
               String path = writeToDam(stream,param.getFileName());
               out.println("The Sling Servlet placed the uploaded file here: " + path);
               InsertProductImageCommand.addImage(path);
                   //Save the uploaded file into the Adobe CQ DAM
                
               
             }
           }
         }
           
         catch (Exception e) {
             e.printStackTrace();
         }
       
     }
       
     
//Save the uploaded file into the AEM DAM using AssetManager APIs
private String writeToDam(InputStream is, String fileName)
{
try
{
    //Inject a ResourceResolver
    ResourceResolver resourceResolver = resolverFactory.getAdministrativeResourceResolver(null);
     
    //Use AssetManager to place the file into the AEM DAM
    com.day.cq.dam.api.AssetManager assetMgr = resourceResolver.adaptTo(com.day.cq.dam.api.AssetManager.class);
    String newFile = "/content/dam/eaga/products/"+fileName ; 
    assetMgr.createAsset(newFile, is,"image/jpeg", true);
         
    // Return the path to the file was stored
    return newFile;
}
catch(Exception e)
{
    e.printStackTrace();
}
return null;
}
   
}