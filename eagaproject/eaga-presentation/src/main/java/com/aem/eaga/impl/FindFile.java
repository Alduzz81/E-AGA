package com.aem.eaga.impl;

import java.io.File;

public class FindFile {
	private static final  String div = "//";
	private static final  String project = "eagaproject"; //eagaproject
	private static String finalPath;
	private static String tempPAth ;
	private final static  String rootPath =  "C:";
	private static boolean advanceSearch;
	
	 public static  String findPath(){
		 finalPath = tempPAth = rootPath;
		 boolean stat = mainSearch(rootPath);
		if(stat){
			return finalPath;
		}else if(!stat) { 
			finalPath = tempPAth = "D:";
			if(mainSearch("D:")){
			return finalPath;
			}
		}return "File not found";

}
	
	private static boolean mainSearch(String rootPath){
		advanceSearch = false;
		boolean isfound = findFile(rootPath);
		if(!isfound){
			finalPath = rootPath;
			advanceSearch = true;
			String[] files = getList(rootPath);
			if(files != null){
				for (String file : files ){
					tempPAth = finalPath+div+file;
					isfound = findFile(tempPAth);
					if(isfound){
						return isfound;
					}
					else{
						tempPAth = finalPath;
					}
				}
			}
		}
		return isfound;
	}
	
	private static boolean findFile(String path){
		String[] files  = getList(path);
		boolean isFinallyFound = searchFile(files);
		return isFinallyFound;
	}
	
	private static String[] getList(String path){
		String npath = path+div;
		File file = new File(npath);
		return file.list();
	}
	
	private static boolean searchFile(String[] list){
		boolean isfound = false;
		if(list != null){
			for (String name : list ){
				if(isfound = finalSearch(name)){
					return isfound;
				} else if(!advanceSearch &&name.toLowerCase().contains("aga")){
					if(isfound = advanceSearch(name)){
						return isfound;
					}
				} else if(advanceSearch){
					String keeper = tempPAth;
					tempPAth += div+name;
					if(!(isfound = findFile(tempPAth))){
						tempPAth = keeper;
					}
				}
			}
		}
		return  isfound;
	}	
	
	private static boolean finalSearch(String name){
		if(name.toLowerCase().equals(project)){
			//TODO  OPTIONAL: add an additional control for the .git repository
			 if(advanceSearch){
				 finalPath = tempPAth;
			 }
			 finalPath = finalPath+div+name; 
			 return true;
		}return false;
	}
	private static boolean advanceSearch(String name){
		String tempPath = finalPath;
		boolean isfound;
		finalPath +=div+name;
		if(!(isfound = findFile(finalPath))){
			finalPath = tempPath;
			return isfound;
		}else{
			return isfound;
		}
	}
	
}
