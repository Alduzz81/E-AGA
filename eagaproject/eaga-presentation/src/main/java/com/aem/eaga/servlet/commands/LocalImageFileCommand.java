package com.aem.eaga.servlet.commands;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;

public class LocalImageFileCommand{
	private final String localPathRoot = "D://e_aga//";
	private final String localPath = localPathRoot + "eagaproject//eaga-content//src//main//content//jcr_root//content//dam//eaga//common//products//";
	private final String renditionsPath = "//_jcr_content//renditions//";
	private Asset asset;
	private String category, fileName;
	private Document doc;
	
	public LocalImageFileCommand(Asset asset, String category, String fileName){
		this.asset = asset;
		this.category = category;
		this.fileName = fileName;
	}
	
	public void createLocalFile(){
		Map<String, Object> assetMap = asset.getMetadata();
		List<Rendition> renditions = asset.getRenditions();
		//Creates the .content.xml file
		createLocalFile(assetMap, fileName);
		//Creates the renditions
		createRenditions(renditions, fileName);
		// Return the path to the file was stored
	}
	
	private void createLocalFile(Map<String, Object> assetMap, String fileName) {
		 String local_image = localPath+category+"//"+fileName;
		 File contentfile = new File(local_image+"//.content.xml");
		 String resp;
		 try{
			 if(!contentfile.exists()){
				new File(local_image).mkdirs();
				createXmlFile(contentfile, assetMap, fileName);
			 }else{
				 resp = "Image already exists!";
			 }
		 }catch(Exception e){
			resp = "Error in Asset Uploading " + e ;
		 }
	}
	
	private void createXmlFile(File localxml, Map<String, Object> metaMap, String fileName){
		try {
			DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
			doc = docBuilder.newDocument();
			//ROOT_ELEMENT
			Element root = createRootElement();
			doc.appendChild(root);
			//ROOT_ELEMENT:JCR_CONTENT
			Element jcr_con = createJCRContent(fileName);
			root.appendChild(jcr_con);
			//ROOT_ELEMENT:JCR_CONTENT:METADATA
			Element meta = createMetaData(metaMap);
			jcr_con.appendChild(meta);
			//ROOT_ELEMENT:JCR_CONTENT:RELATED
			Element related = doc.createElement("related");
			addAttribute(related, "jcr:primaryType", "nt:unstructured");
			jcr_con.appendChild(related);
			
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(doc);
			StreamResult result = new StreamResult(localxml);
			
			transformer.transform(source, result);
			
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (TransformerConfigurationException e) {
			e.printStackTrace();
		} catch (TransformerException e) {
			e.printStackTrace();
		}
	}
	private void addAttribute(Element ele, String name_attr, String value_attr){
		Attr attr = doc.createAttribute(name_attr);
		attr.setValue(value_attr);
		ele.setAttributeNode(attr);
	}
	private Element createRootElement(){
		Element rootElement = doc.createElement("jcr:root");
		addAttribute(rootElement, "xmlns:tiff", "http://ns.adobe.com/tiff/1.0/");
		addAttribute(rootElement, "xmlns:dc", "http://purl.org/dc/elements/1.1/");
		addAttribute(rootElement, "xmlns:dam", "http://www.day.com/dam/1.0");
		addAttribute(rootElement, "xmlns:cq", "http://www.day.com/jcr/cq/1.0");
		addAttribute(rootElement, "xmlns:jcr", "http://www.jcp.org/jcr/1.0");
		addAttribute(rootElement, "xmlns:nt", "http://www.jcp.org/jcr/nt/1.0");
		addAttribute(rootElement, "jcr:primaryType", "dam:Asset");
		return rootElement;
	}
	private Element createJCRContent(String fileName){ 
		Element jcr_cont = doc.createElement("jcr:content");
		addAttribute(jcr_cont, "cq:name", fileName);
		addAttribute(jcr_cont, "cq:parentPath", localPath+category);
		addAttribute(jcr_cont, "jcr:data", "{Binary}");
		addAttribute(jcr_cont, "jcr:mimeType", "image/jpeg");
		addAttribute(jcr_cont, "jcr:primaryType", "dam:AssetContent");
		return jcr_cont;
	}
	private Element createMetaData(Map<String, Object> metaMap){
		Element metaElement = doc.createElement("metadata");
		Iterator entries = metaMap.entrySet().iterator();
		while (entries.hasNext()) {
		    Map.Entry entry = (Map.Entry) entries.next();
		    String key = entry.getKey().toString();
		    if( key.contains("dam") || key.contains("tiff") || key.contains("dc"))
		    {
		    	addAttribute(metaElement, key.trim(), entry.getValue().toString().trim());
		    }
		}
		addAttribute(metaElement, "jcr:mixinTypes", "[cq:Taggable]");
		addAttribute(metaElement, "jcr:primaryType", "nt:unstructured");
		return metaElement;
	}
	private void createRenditions(List<Rendition> renditions, String fileName){
		String local_renditions = localPath+category+"//"+fileName;
		new File(local_renditions+"//_jcr_content").mkdir();
		new File(local_renditions+renditionsPath).mkdir();
		try {
			Iterator entries = renditions.iterator();
			while(entries.hasNext()){
				Rendition myrendition = (Rendition) entries.next();
				String rendName = myrendition.getName();
				String typeimg;
				if(rendName.equals("original")){
					typeimg ="jpeg";
					//myrendition = myrendition.getAsset().getOriginal();
				}else{
					String[] x  = rendName.split("[.]");
					//int j = x.length;
					typeimg = x[(x.length)-1];
				}
				File newfile = new File(local_renditions+renditionsPath+rendName);
				InputStream stream = myrendition.getStream();
				BufferedImage image = ImageIO.read(stream);
				ImageIO.write(image, typeimg, newfile);
			} 
		}catch (IOException e) {
			e.printStackTrace();
		}
	}
}