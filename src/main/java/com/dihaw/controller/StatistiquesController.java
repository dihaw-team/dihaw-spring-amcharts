package com.dihaw.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.dihaw.dto.ListDataResponseDTO;
import com.dihaw.services.StatistiquesServices;

@Controller
@RequestMapping("/stat")
public class StatistiquesController {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	private static String PIE_CAHRT_VIEW 				= "view/stat/pieChart-exmpl";
	private static String SERIAL_CAHRT_ANNUEL_VIEW		= "view/stat/serialChart-annuel";
	private static String SERIAL_CAHRT_MENSUEL_VIEW		= "view/stat/serialChart-mensuel";
	private static String SERIAL_CAHRT_QUOTIDIEN_VIEW 	= "view/stat/serialChart-quotidien";

	@Autowired
	StatistiquesServices statistiquesServices;
	
	@RequestMapping("/pieChart/exmpl")
	public String showStatisticsView(Model model) {
		
		logger.info("Show the pieChart view ");
		
		return PIE_CAHRT_VIEW;
 
	}
	
	@RequestMapping("/serialChart/annuel")
	public String showAnnuelStatisticsView(Model model) {
		
		logger.info("Show the ANNUEL chart view ");
		
		return SERIAL_CAHRT_ANNUEL_VIEW;
	}
	
	@RequestMapping("/serialChart/mensuel")
	public String showMensuelStatisticsView(Model model) {
		
		logger.info("Show the MENSUEL chart view ");
		
		return SERIAL_CAHRT_MENSUEL_VIEW;
	}
	
	@RequestMapping("/serialChart/quotidien")
	public String showQuotidienStatisticsView(Model model) {
		
		logger.info("Show the QUOTIDIEN chart view ");
		
		return SERIAL_CAHRT_QUOTIDIEN_VIEW;
	}	
	
	
	@RequestMapping("/retriveData")
	public @ResponseBody ListDataResponseDTO getSerialChartDataResponse() {
		
		ListDataResponseDTO response = statistiquesServices.getSerialChartValues();
		
		return response;
	}

}
