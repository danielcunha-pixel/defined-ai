"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>
          A summary of your current project status and recent activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="ds-text-body-md font-regular text-grey-60">
          Your project has 12 active tasks and 3 completed this week.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="primary" size="sm">
          View Details
        </Button>
        <Button variant="ghost" size="sm">
          Dismiss
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CardWithFormDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>
          Set up a new project in your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="project-name"
            className="ds-text-body-md font-medium text-grey-100"
          >
            Name
          </label>
          <Input id="project-name" placeholder="My Project" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="project-desc"
            className="ds-text-body-md font-medium text-grey-100"
          >
            Description
          </label>
          <Input id="project-desc" placeholder="Brief description..." />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="primary" size="sm">
          Create
        </Button>
        <Button variant="tertiary" size="sm">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CardVariantsDemo() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard card with border and shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="ds-text-body-md font-regular text-grey-60">
            Content goes here.
          </p>
        </CardContent>
      </Card>
      <Card className="border-purple-20 bg-purple-10/30">
        <CardHeader>
          <CardTitle>Highlighted Card</CardTitle>
          <CardDescription>With custom background and border</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="ds-text-body-md font-regular text-grey-60">
            For important content.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
