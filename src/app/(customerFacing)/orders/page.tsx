"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/component/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { Input } from "@/component/ui/input";
import { Label } from "@/component/ui/label";

import { emailOrderHistory } from "./_actions/orders";

export default function OrdersPage() {
  return (
    <form action={emailOrderHistory} className={"max-w-2xl mx-auto"}>
      <Card>
        <CardHeader>
          <CardTitle>{"My Orders"}</CardTitle>
          <CardDescription>
            {"Enter your email and we will email you your download links"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={"space-y-2"}>
            <Label>{"Email"}</Label>
            <Input type={"email"} name={"email"} id={"email"} required />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className={"w-full"} size={"lg"} disabled={pending} type={"submit"}>
      {pending ? "Sending..." : "Send"}
    </Button>
  );
}
