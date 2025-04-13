import NotificationsList from './NotificationsList';

export default function NotificationsPage() {
  // Sample data - this would typically come from an API or props
  const sampleNotifications = [
    {
      id: 1,
      message: "Meg Griffin has left you a review. Both of your reviews from this trip are now public.",
      date: "March 1, 2023"
    },
    {
      id: 2,
      message: "Cleveland Brown has left you a review. Both of your reviews from this trip are now public.",
      date: "February 26, 2023"
    },
    {
      id: 3,
      message: "Cleveland Brown has left you a review. Both of your reviews from this trip are now public.",
      date: "February 26, 2023"
    },
    {
      id: 4,
      message: "Cleveland Brown has left you a review. Both of your reviews from this trip are now public.",
      date: "February 26, 2023"
    },
    {
      id: 5,
      message: "Cleveland Brown has left you a review. Both of your reviews from this trip are now public.",
      date: "February 26, 2023"
    },
    {
      id: 6,
      message: "Cleveland Brown has left you a review. Both of your reviews from this trip are now public.",
      date: "February 26, 2023"
    },
    {
      id: 7,
      message: "Cleveland Brown has left you a review. Both of your reviews from this trip are now public.",
      date: "February 26, 2023"
    }
  ];

  return (
    <div className="max-w-3xl py-4 px-10">
      <NotificationsList initialNotifications={sampleNotifications} />
    </div>
  );
}