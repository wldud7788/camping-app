"use client";

// app/error.tsx


type ErrorProps = {
  error: Error & { digest?: string }; // error의 타입 정의
  reset: () => void; // reset 함수의 타입 정의
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <></>
  );
}