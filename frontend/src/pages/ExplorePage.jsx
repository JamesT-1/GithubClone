import { useState } from "react";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Swift", "HTML", "CSS"];

const ExplorePage = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const exploreRepos = async (language) => {
    setLoading(true);
    setSelectedLanguage(language);
    try {
      const res = await fetch(`/api/explore/repos/${language}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setRepos(data.repos);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold text-center my-6">Explore Popular Repos</h1>
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => exploreRepos(lang)}
            className={`px-4 py-2 rounded-lg text-sm font-medium bg-glass transition-all duration-200 hover:scale-95 ${
              selectedLanguage === lang ? "border border-blue-400" : ""
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
      {loading && <Spinner />}
      {!loading && repos.length > 0 && <Repos repos={repos} alwaysFullWidth />}
    </div>
  );
};
export default ExplorePage;
