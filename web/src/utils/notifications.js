import { notifications } from "@mantine/notifications";

export function showNotification(color, title, message) {
  notifications.show({
    color,
    title,
    message,
  });
}
