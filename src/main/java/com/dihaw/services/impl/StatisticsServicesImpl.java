package com.dihaw.services.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.dihaw.dto.ListDataResponseDTO;
import com.dihaw.entity.Statistiques;
import com.dihaw.repository.StatistiquesRepository;
import com.dihaw.services.StatistiquesServices;

@Service
@Transactional(propagation = Propagation.SUPPORTS)
public class StatisticsServicesImpl implements StatistiquesServices{
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	StatistiquesRepository statistiquesRepository;

	@Transactional(propagation = Propagation.REQUIRED)
	public ListDataResponseDTO getSerialChartValues() {
		
		ListDataResponseDTO list = new ListDataResponseDTO();
		
		logger.info("invok serialChart rep stat");
		
		List<Statistiques> dataList = statistiquesRepository.list();
		
		list.setData(dataList);
		
		return list;
	}


}
