package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.NotificationDTO;
import org.example.careercrafter.CareerCrafter.entity.UserData;

import java.util.List;

public interface NotificationService {
    void createNotification(UserData user, String message);
    List<NotificationDTO> getNotificationsForUser(String userEmail);
}