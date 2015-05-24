package com.dihaw.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dihaw.entity.Statistiques;

@Repository
public interface StatistiquesRepository extends JpaRepository<Statistiques, Integer>{
	
	@Query("select s from Statistiques s group by s.date")
	List<Statistiques> list();

}
