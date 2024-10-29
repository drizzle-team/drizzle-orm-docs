---
title: How to setup MySQL locally
slug: mysql-local-setup
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

#### Pull the MySQL image

Pull the latest MySQL image from Docker Hub. In your terminal, run `docker pull mysql` to pull the latest MySQL version from Docker Hub:

```bash copy
docker pull mysql
```

Alternatively, you can pull preferred version with a specific tag:

```bash copy
docker pull mysql:8.2
```

When MySQL image is downloaded, you can check it in `Images` tab in Docker Desktop or by running `docker images`:

<Section>
```bash copy
docker images
```

```plaintext
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
mysql        latest    4e8a34aea708   2 months ago   609MB
```
</Section>

#### Start a MySQL instance

To start a new MySQL container, run the following command:

```bash copy
docker run --name drizzle-mysql -e MYSQL_ROOT_PASSWORD=mypassword -d -p 3306:3306 mysql
```

1. The `--name` option assigns the container the name `drizzle-mysql`.
2. The `-e MYSQL_ROOT_PASSWORD=` option sets the `MYSQL_ROOT_PASSWORD` environment variable with the specified value. This is password for the root user.
3. The `-d` flag runs the container in detached mode (in the background).
4. The `-p` option maps port `3306` on the container to port `3306` on your host machine, allowing MySQL to be accessed from your host system through this port.
5. The `mysql` argument specifies the image to use for the container. You can also specify other versions like `mysql:8.2`.

You can also specify other parameters like:

1. `-e MYSQL_DATABASE=` to create a new database when the container is created. Default is `mysql`.
2. `-e MYSQL_USER=` and `-e MYSQL_PASSWORD=` to create a new user with a password when the container is created. But you still need to specify `MYSQL_ROOT_PASSWORD` for `root` user.

To check if the container is running, check `Containers` tab in Docker Desktop or use the `docker ps` command:

```plaintext
CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS                               NAMES
19506a8dc12b   mysql         "docker-entrypoint.s…"   4 seconds ago    Up 3 seconds    33060/tcp, 0.0.0.0:3306->3306/tcp   drizzle-mysql
```

#### Configure database url

To connect to the MySQL database, you need to provide the database URL. The URL format is:

```plaintext
mysql://<user>:<password>@<host>:<port>/<database>
```

You should replace placeholders with your actual values. For example, for created container the url will be:

```plaintext
mysql://root:mypassword@localhost:3306/mysql
```

Now you can connect to the database using the URL in your application.
</Steps>
