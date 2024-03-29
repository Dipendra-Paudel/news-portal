import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CategoryNewsCard from "../../common/CategoryNewsCard";
import { searchNews } from "../../api/news";
import Loader from "../../common/loader";
import { AuthButton } from "../../common/button";

const SearchResult = ({ query }) => {
  const history = useRef();
  history.current = useHistory();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [news, setNews] = useState([]);
  const [nextPage, setNextPage] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);

  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    const getSearchNews = async () => {
      const { news, nextPage } = await searchNews(query, 6, page);
      if (mounted) {
        setNextPage(nextPage);
        setNews((n) => (page === 1 ? [...news] : [...n, ...news]));
        setLoading(false);
        setFetchingMore(false);
      }
    };

    (fetchingMore || loading) && getSearchNews();
  }, [loading, page, query, fetchingMore, mounted]);

  useEffect(() => {
    history.current.listen(() => {
      setLoading(true);
      setPage(1);
      setNextPage(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="py-20 grid place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="common-style py-10">
      <div className="max-w-screen-xl mx-auto">
        {news.length > 0 && (
          <div>
            <div className="text-2xl pb-4 font-semibold">Search Results:</div>
            <div className="space-y-8">
              {news.map((n, index) => (
                <CategoryNewsCard key={index} {...n} />
              ))}
            </div>

            {nextPage && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setFetchingMore(true);
                  setPage(page + 1);
                }}
                className="mt-8 w-36 md:mx-auto"
              >
                <AuthButton label="More News" submitting={fetchingMore} />
              </form>
            )}
          </div>
        )}
        {news.length === 0 && (
          <div className="py-10 text-2xl text-center font-semibold">
            No Search Result:
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
