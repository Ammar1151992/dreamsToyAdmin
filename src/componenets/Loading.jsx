import { useStore } from "../store";
const Loading = () => {
    const {loading} = useStore()
  return (
    <div className={loading ? "loading-child" : "disable"}>
      <span className="loader"></span>
    </div>
  );
};

export default Loading;