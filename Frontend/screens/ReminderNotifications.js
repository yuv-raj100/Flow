import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const ReminderNotifications = () => {
  const [reminders, setReminders] = useState([]);
  const email = "raj@123";

  // Request permissions for notifications
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to receive notifications was denied');
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.64.248:3000");

    ws.onopen = () => {
      // Send the email after connection is open
      ws.send(JSON.stringify({ type: "setEmail", email }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.hasReminder) {
        console.log("Reminders received:", data.reminders);
        setReminders(data.reminders);

        // Send a notification
        data.reminders.forEach(async (reminder) => {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Payment Alert",
              body: `Payment due of Rs ${reminder.amount} by ${reminder.customerName} on ${reminder.reminderDate}`,
            },
            trigger: null, // Immediate notification
          });
        });
      } else {
        console.log("No reminders for today");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <View>
      <Text>
        {reminders.length > 0
          ? `You have ${reminders.length} reminders today`
          : "No reminders"}
      </Text>
      {reminders.map((reminder, index) => (
        <Text key={index}>
          Reminder for {reminder.description} on {reminder.reminderDate}
        </Text>
      ))}
    </View>
  );
};

export default ReminderNotifications;
