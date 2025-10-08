package org.example.careercrafter.CareerCrafter.repository;

import org.example.careercrafter.CareerCrafter.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<Application,Long> {
}
