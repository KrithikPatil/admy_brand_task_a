// app/profile/page.tsx
"use client";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div
      className="max-w-4xl mx-auto py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
      <Card className="p-6 shadow-xl bg-white/80 dark:bg-gray-800">
        <CardContent className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full p-0 items-center sm:items-start">
          <div className="flex justify-center sm:block w-full sm:w-auto">
            <Avatar className="h-0 w-24" />
          </div>
          <div className="text-center sm:text-left w-full">
            <h2 className="text-2xl font-semibold break-words">John Doe</h2>
            <p className="text-gray-600 dark:text-gray-300 break-words">johndoe@example.com</p>
            <p className="mt-2 text-sm text-gray-500 break-words">Account Type: Premium</p>
          </div>
        </CardContent>
      </Card>
      
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="p-4 bg-white/80 dark:bg-gray-800">
          <h3 className="text-xl font-medium mb-2">Recent Activity</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc ml-4">
            <li>Logged in 2 hours ago</li>
            <li>Updated settings</li>
            <li>Viewed report: Sales Summary</li>
          </ul>
        </Card>
        <Card className="p-4 bg-white/80 dark:bg-gray-800">
          <h3 className="text-xl font-medium mb-2">Usage Statistics</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">Files uploaded: 12</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">Reports viewed: 8</p>
        </Card>
      </motion.div>
    </motion.div>
  );
}