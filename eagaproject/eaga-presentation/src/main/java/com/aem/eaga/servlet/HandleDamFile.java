package com.aem.eaga.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.rmi.ServerException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.jcr.Session;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
//Sling Imports
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;

import com.aem.eaga.common.DbUtility;
import com.aem.eaga.servlet.commands.LocalImageFileCommand;
import com.day.cq.dam.api.Asset; 

//This is a component so it can provide or consume services
@SlingServlet(paths = "/bin/updamfile", methods = "POST", metatype = true)
public class HandleDamFile extends SlingAllMethodsServlet {
private static final long serialVersionUID = 2598426539166789515L;

	// private List<String> paths = new ArrayList<String>();
	private String id, category;
	private final String damPath = "/content/dam/eaga/common/products/";
	private int time;	

	// Inject a Sling ResourceResolverFactory
	@Reference
	private ResourceResolverFactory resolverFactory;

	@Override
	protected void doPost(SlingHttpServletRequest request, SlingHttpServletResponse response)
			throws ServerException, IOException {

		try {
			final boolean isMultipart = org.apache.commons.fileupload.servlet.ServletFileUpload
					.isMultipartContent(request);
			PrintWriter out = null;

			out = response.getWriter();
			if (isMultipart) {
				final java.util.Map<String, org.apache.sling.api.request.RequestParameter[]> params = request
						.getRequestParameterMap();
				for (final java.util.Map.Entry<String, org.apache.sling.api.request.RequestParameter[]> pairs : params
						.entrySet()) {
					String paramSet = pairs.getKey();
					String paramArray[] = paramSet.split(",");
					id = paramArray[0];
					category = paramArray[1];

					final org.apache.sling.api.request.RequestParameter[] pArr = pairs.getValue();
					time = pArr.length * 1500;
					for (int i = 0; i < pArr.length; i++) {
						final org.apache.sling.api.request.RequestParameter param = pArr[i];
						final InputStream stream = param.getInputStream();
						// Process the image
						addImage(id, writeToDam(stream, param.getFileName()));
						//TO USE WHEN THE SERVER IS DOWN
						//writeToDam(stream, param.getFileName());
					}
				}

			}
		}

		catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static boolean addImage(String idProduct, String productImagePath) throws IOException {
		try {
			DbUtility dbu = new DbUtility();

			Connection conn = dbu.getConnection();

			String newRecordSql = "INSERT INTO eaga.immagini_prodotti (IdProdotto,PathImmagine)VALUES(?,?);";
			PreparedStatement preparedStmt = conn.prepareStatement(newRecordSql);
			preparedStmt.setInt(1, Integer.parseInt(idProduct));
			preparedStmt.setString(2, productImagePath);

			boolean res = preparedStmt.execute();

			preparedStmt.close();
			conn.close();
			return res;
		} catch (Exception e) {
			throw new IOException(e);
		}
	}

	// Save the uploaded file into the AEM DAM using AssetManager APIs
	private String writeToDam(InputStream is, String fileName) {
		try {
			// Inject a ResourceResolver
			ResourceResolver resourceResolver = resolverFactory.getAdministrativeResourceResolver(null);

			// Use AssetManager to place the file into the AEM DAM
			com.day.cq.dam.api.AssetManager assetMgr = resourceResolver.adaptTo(com.day.cq.dam.api.AssetManager.class);
			String newFile = damPath + category + "/" + fileName;

			Asset myasset = assetMgr.createAsset(newFile, is, "image/jpeg", true);
			Thread.sleep(time);   
			
			LocalImageFileCommand imagefile = new LocalImageFileCommand(myasset, category, fileName);
			String path = imagefile.createLocalFile();
			return newFile;
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return null;
	}
}