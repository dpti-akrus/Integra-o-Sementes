import Link from "next/link";
import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const response = await fetch("/api/instagram");

      if (!response.ok) {
        throw new Error("Erro ao buscar posts do Instagram");
      }

      const result = await response.json();

      setPosts(result.data || []);
    } catch (error) {
      console.error("Erro ao carregar Instagram:", error);
      setPosts([]);
    }
  }

  return (
    <div className="px-10 pt-0 pb-12 md:px-40 md:py-24 bg-customGreen1">
      <h1 className="font-openSans font-bold text-xl md:text-4xl text-[#354D4D] md:pb-4">
        Últimas Postagens
      </h1>

      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-1 justify-center items-center">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const post = posts[index];

            const imageUrl =
              post?.media_type === "VIDEO"
                ? post?.thumbnail_url
                : post?.media_url;

            return (
              <Link
                key={post?.id || index}
                target="_blank"
                href={
                  post?.permalink ||
                  "https://www.instagram.com/integracaosementes/"
                }
                className={
                  index >= 4
                    ? "hidden md:flex items-center justify-center"
                    : "flex items-center justify-center"
                }
              >
                <img
                  width={400}
                  height={400}
                  src={
                    imageUrl ||
                    "/imgs/integracao/posts-grid.svg"
                  }
                  alt="Publicação do Instagram Integração Sementes"
                  loading="lazy"
                  className="w-[400px] h-[400px] object-cover"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}