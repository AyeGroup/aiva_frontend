const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/50 z-50">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full force-spin" />
    </div>
  );
};

export default PageLoader;

// import styles from "./PageLoader.module.css";

// const PageLoader = () => {
//   return (
//     <div className={styles.overlay}>
//       <div className={styles.spinner} />
//     </div>
//   );
// };

// export default PageLoader;
