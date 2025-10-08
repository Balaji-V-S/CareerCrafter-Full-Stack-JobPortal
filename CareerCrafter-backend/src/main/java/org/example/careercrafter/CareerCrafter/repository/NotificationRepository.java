package org.example.careercrafter.CareerCrafter.repository;

import org.example.careercrafter.CareerCrafter.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
}
