package org.example.careercrafter.CareerCrafter.service;

import org.example.careercrafter.CareerCrafter.dto.NotificationDTO;
import org.example.careercrafter.CareerCrafter.entity.Notification;
import org.example.careercrafter.CareerCrafter.entity.UserData;
import org.example.careercrafter.CareerCrafter.utility.UserMapper;
import org.example.careercrafter.CareerCrafter.repository.NotificationRepository;
import org.example.careercrafter.CareerCrafter.repository.UserDataRepository;
import org.example.careercrafter.CareerCrafter.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired private NotificationRepository notificationRepository;
    @Autowired private UserDataRepository userDataRepository;
    @Autowired private UserMapper userMapper;

    @Override
    public void createNotification(UserData user, String message) {
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(message);
        notificationRepository.save(notification);
    }

    @Override
    public List<NotificationDTO> getNotificationsForUser(String userEmail) {
        UserData user = userDataRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        return notificationRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(userMapper::toNotificationDTO)
                .collect(Collectors.toList());
    }
}