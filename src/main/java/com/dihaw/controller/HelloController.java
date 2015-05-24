package com.dihaw.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.dihaw.services.StatistiquesServices;

@Controller
public class HelloController{
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private static String ABOUT_VIEW = "view/about/view";
	
	@Autowired
	StatistiquesServices statisticsServices;
    
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String showHelloView(Model model) {
		
		logger.info("Show the about view ");
 
		return ABOUT_VIEW;
 
	}
	

}
