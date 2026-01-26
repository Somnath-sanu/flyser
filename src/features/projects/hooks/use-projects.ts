import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";

export const useProject = (projectId: Id<"projects">) => {
  return useQuery(api.projects.getById, {
    id: projectId,
  });
};

export const useProjects = () => {
  return useQuery(api.projects.get);
};

export const useProjectsPartial = (limit: number) => {
  return useQuery(api.projects.getPartial, {
    limit,
  });
};

export const useCreateProject = () => {
  const { userId } = useAuth();
  return useMutation(api.projects.create).withOptimisticUpdate(
    (localStorage, args) => {
      const existingProjects = localStorage.getQuery(api.projects.get);

      if (existingProjects !== undefined) {
        // eslint-disable-next-line react-hooks/purity
        const now = Date.now();
        const newProject: Doc<"projects"> = {
          _id: crypto.randomUUID() as Id<"projects">,
          name: args.name,
          _creationTime: now,
          ownerId: userId || "anonymous",
          updatedAt: now,
        };

        localStorage.setQuery(api.projects.get, {}, [
          newProject,
          ...existingProjects,
        ]);
      }
    },
  );
};

export const useRenameProject = (projectId: Id<"projects">) => {
  return useMutation(api.projects.rename).withOptimisticUpdate(
    (localStorage, args) => {
      const existingProject = localStorage.getQuery(api.projects.getById, {
        id: projectId,
      });

      if (existingProject !== undefined && existingProject !== null) {
        // eslint-disable-next-line react-hooks/purity
        const now = Date.now();

        localStorage.setQuery(
          api.projects.getById,
          {
            id: projectId,
          },
          {
            ...existingProject,
            name: args.name,
            updatedAt: now,
          },
        );
      }

      const existingProjects = localStorage.getQuery(api.projects.get);

      if (existingProjects !== undefined) {
        // eslint-disable-next-line react-hooks/purity
        const now = Date.now();
        localStorage.setQuery(
          api.projects.get,
          {},
          existingProjects.map((p) =>
            p._id === args.id
              ? {
                  ...p,
                  name: args.name,
                  updatedAt: now,
                }
              : p,
          ),
        );
      }
    },
  );
};
