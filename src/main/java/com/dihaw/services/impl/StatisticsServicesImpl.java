package com.dihaw.services.impl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.dihaw.dto.DataDTO;
import com.dihaw.dto.ListDataResponseDTO;
import com.dihaw.services.StatisticsServices;

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class StatisticsServicesImpl implements StatisticsServices{
	
	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Transactional(propagation = Propagation.REQUIRED)
	public ListDataResponseDTO getDataValues(){
		
		DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		
		List<DataDTO> dataList = new ArrayList<DataDTO>();
		
		try {
			dataList.add(new DataDTO(formatter.parse("2015-02-23"), 133034));
			dataList.add(new DataDTO(formatter.parse("2015-02-24"), 122290));
			dataList.add(new DataDTO(formatter.parse("2015-02-25"), 383603));
			dataList.add(new DataDTO(formatter.parse("2015-02-28"), 125285));
			dataList.add(new DataDTO(formatter.parse("2015-03-01"), 118042));
			dataList.add(new DataDTO(formatter.parse("2015-03-02"), 102500));
			dataList.add(new DataDTO(formatter.parse("2015-03-03"), 434047));
			dataList.add(new DataDTO(formatter.parse("2015-03-04"), 422374));
			dataList.add(new DataDTO(formatter.parse("2015-03-07"), 396473));
			dataList.add(new DataDTO(formatter.parse("2015-03-08"), 453142));
			
		} catch (ParseException e) {

			logger.error("ParseException: "+e.getMessage());
		}
		

		ListDataResponseDTO response = new ListDataResponseDTO();
		
		response.setData(dataList);
		
		return response;
	}

}
