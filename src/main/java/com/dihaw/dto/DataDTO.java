package com.dihaw.dto;

import java.util.Date;

public class DataDTO {
	
	protected Date date;
	protected Integer value;
	
	public DataDTO(Date date, Integer value){
		this.date = date;
		this.value = value;
	}
	
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Integer getValue() {
		return value;
	}
	public void setValue(Integer value) {
		this.value = value;
	}
	
	

}
