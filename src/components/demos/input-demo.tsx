"use client";

import { Input } from "@/components/ui/input";
import { Mail, Eye, EyeOff } from "lucide-react";
import { IconSearch as Search } from "@/components/icons";
import { useState } from "react";

export function InputDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input placeholder="Enter your email" type="email" />
    </div>
  );
}

export function InputSizesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input placeholder="Default input" />
    </div>
  );
}

export function InputStatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input placeholder="Default" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Invalid" aria-invalid="true" defaultValue="bad-email" />
    </div>
  );
}

export function InputWithLabelDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email-input"
          className="ds-text-body-md font-medium text-grey-100"
        >
          Email
        </label>
        <Input id="email-input" placeholder="you@example.com" type="email" />
        <p className="ds-text-body-sm font-regular text-grey-50">
          We&apos;ll never share your email.
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="search-input"
          className="ds-text-body-md font-medium text-grey-100"
        >
          Search
        </label>
        <div className="relative">
          <Search size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-40" />
          <Input
            id="search-input"
            placeholder="Search..."
            className="pl-9"
          />
        </div>
      </div>
    </div>
  );
}
