import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';
import { useEffect, useState } from "react";

export function RepositoryList() {

  interface IRepository {
    name: string;
    description: string;
    html_url: string;
  }

  const [repositories, setRepositories] = useState<IRepository[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then(response => response.json())
      .then(data => setRepositories(data))
  }, [repositories]);

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>

      <ul>
        {repositories.map(repository => (
          <RepositoryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  )
}