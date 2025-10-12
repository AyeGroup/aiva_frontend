import Swal from "sweetalert2";

export default async function Alert(messageTitle:string, isQuestion = false) {
  try {
    // Show a confirmation dialog (or just an alert if no question is required)
    if (!isQuestion) {
      // Simple alert
      await Swal.fire({
        title: messageTitle,
        // imageUrl: "true",
        confirmButtonText: "تایید",
      });
    } else {
      // Question alert with confirmation and cancellation buttons
      const result = await Swal.fire({
        imageUrl: "true",
        title: messageTitle,
        confirmButtonText: "تایید",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "لغو",
      });

      return result.isConfirmed; // Return true if confirmed, false otherwise
    }
  } catch (error) {
    console.error("Error displaying alert:", error);
    return false; // In case of error, return false
  }
}
