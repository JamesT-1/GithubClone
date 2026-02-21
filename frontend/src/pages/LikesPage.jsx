import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const LikesPage = () => {
  const [likedBy, setLikedBy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const res = await fetch("/api/users/likes", { credentials: "include" });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setLikedBy(data.likedBy);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getLikes();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold text-center my-6">Users Who Liked Your Profile</h1>
      {likedBy.length === 0 ? (
        <p className="text-center text-gray-400">No likes yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {likedBy.map((user) => (
            <div key={user.username} className="bg-glass rounded-lg p-4 flex items-center gap-3">
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-12 h-12 rounded-full shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold truncate">{user.username}</p>
                <p className="text-xs text-gray-400">
                  {new Date(user.likedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default LikesPage;
