package com.dihaw.dto;

import java.util.List;

import com.dihaw.entity.Statistiques;

public class ListDataResponseDTO {
	
	protected List<Statistiques> data;

	public List<Statistiques> getData() {
		return data;
	}

	public void setData(List<Statistiques> data) {
		this.data = data;
	}

}
