import React, { useCallback } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/tabs/tabs";
import useSwipe from "../../hooks/useSwipe";
import { DogList } from "./DogList";

export const PreferencesView = () => {
  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="likes" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger
              value="favorites"
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className="hidden ml-2 sm:inline">Favorites</span>
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
              </svg>
              <span className="hidden ml-2 sm:inline">Likes</span>
            </TabsTrigger>
            <TabsTrigger
              value="dislikes"
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M17 14V2" />
                <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
              </svg>
              <span className="hidden ml-2 sm:inline">Dislikes</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="favorites">
            <DogList list={[]} />
          </TabsContent>
          <TabsContent value="likes"></TabsContent>
          <TabsContent value="dislikes"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
