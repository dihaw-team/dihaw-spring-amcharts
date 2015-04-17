package com.dihaw.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HelloController{
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private static String ABOUT_VIEW = "view/about/view";
	private static String STATISTICS_VIEW = "view/statistics/view";
    
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String showHelloView(Model model) {
		
		logger.info("Show the about view ");
 
		return ABOUT_VIEW;
 
	}
	
	@RequestMapping("/statistics")
	public String showStatisticsView(Model model) {
		
		logger.info("Show the chart view ");
 
		return STATISTICS_VIEW;
 
	}


}
