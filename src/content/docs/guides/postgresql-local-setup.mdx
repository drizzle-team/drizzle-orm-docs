---
title: How to setup PostgreSQL locally
slug: postgresql-local-setup
---

import Section from "@mdx/Section.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import Steps from '@mdx/Steps.astro';

<Prerequisites>
- Install latest [Docker Desktop](https://www.docker.com/products/docker-desktop/). Follow the instructions for your operating system.
</Prerequisites>

<Steps>

#### Pull the PostgreSQL image

Pull the latest PostgreSQL image from Docker Hub. In your terminal, run `docker pull postgres` to pull the latest Postgres version from Docker Hub:

```bash copy
docker pull postgres
```

Alternatively, you can pull preferred version with a specific tag:

```bash copy
docker pull postgres:15
```

When postgres image is downloaded, you can check it in `Images` tab in Docker Desktop or by running `docker images`:

<Section>
```bash copy
docker images
```

```plaintext
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
postgres     latest    75282fa229a1   6 weeks ago     453MB
```
</Section>

#### Start a Postgres instance

To start a new PostgreSQL container, run the following command:

```bash copy
docker run --name drizzle-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
```

1. The `--name` option assigns the container the name `drizzle-postgres`.
2. The `-e POSTGRES_PASSWORD=` option sets the `POSTGRES_PASSWORD` environment variable with the specified value.
3. The `-d` flag runs the container in detached mode (in the background).
4. The `-p` option maps port `5432` on the container to port `5432` on your host machine, allowing PostgreSQL to be accessed from your host system through this port.
5. The `postgres` argument specifies the image to use for the container. You can also specify other versions like `postgres:15`.

You can also specify other parameters like:

1. The `-e POSTGRES_USER=` option sets the `POSTGRES_USER` environment variable with the specified value. Postgres uses the default user when this is empty. Most of the time, it is `postgres` and you can check it in the container logs in Docker Desktop or by running `docker logs <container_name>`.
2. The `-e POSTGRES_DB=` option sets the `POSTGRES_DB` environment variable with the specified value. Defaults to the `POSTGRES_USER` value when is empty.

To check if the container is running, check `Containers` tab in Docker Desktop or use the `docker ps` command:

```plaintext
CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                    NAMES
df957c58a6a3   postgres   "docker-entrypoint.s…"   4 seconds ago   Up 3 seconds   0.0.0.0:5432->5432/tcp   drizzle-postgres
```

#### Configure database url

To connect to the PostgreSQL database, you need to provide the database URL. The URL format is:

```plaintext
postgres://<user>:<password>@<host>:<port>/<database>
```

You should replace placeholders with your actual values. For example, for created container the url will be:

```plaintext
postgres://postgres:mypassword@localhost:5432/postgres
```

Now you can connect to the database using the URL in your application.
</Steps>
