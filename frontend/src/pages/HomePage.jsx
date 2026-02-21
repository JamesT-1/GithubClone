import { useState } from "react";
import Search from "../components/Search";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    try {
      const res = await fetch(`/api/users/profile/${username}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setUserProfile(data.userProfile);
      setRepos(data.repos);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSort = (sortType) => {
    setSortType(sortType);
    let sortedRepos = [...repos];
    if (sortType === "recent") {
      sortedRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortType === "stars") {
      sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "forks") {
      sortedRepos.sort((a, b) => b.forks_count - a.forks_count);
    }
    setRepos(sortedRepos);
  };

  return (
    <div className="m-4">
      <Search onSearch={getUserProfileAndRepos} />
      {loading && <Spinner />}
      {userProfile && !loading && (
        <>
          <SortRepos sortType={sortType} onSort={onSort} />
          <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
            <ProfileInfo userProfile={userProfile} />
            <Repos repos={repos} />
          </div>
        </>
      )}
    </div>
  );
};
export default HomePage;
