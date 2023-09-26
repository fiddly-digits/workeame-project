import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";

export default function CommentCard() {
  return (
    <Card className="w-60 md:max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="sm" src="/pictures/man.png" />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Alex R.
            </h4>
            <h5 className="text-xs tracking-tight text-default-400">@alexr</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-xs text-default-400">
        <p>
          ¡La mejor florista! Trabajo de calidad, a precio justo y puntual. ¡La
          recomiento altamente! 💖🌺
        </p>
      </CardBody>
      <CardFooter className="gap-3 flex justify-center ">
        <div className="h-5 w-5">
          <img src="/star.svg" alt="star" />
        </div>
        <div className="h-5 w-5">
          <img src="/star.svg" alt="star" />
        </div>
        <div className="h-5 w-5">
          <img src="/star.svg" alt="star" />
        </div>
        <div className="h-5 w-5">
          <img src="/star.svg" alt="star" />
        </div>
        <div className="h-5 w-5">
          <img src="/star.svg" alt="star" />
        </div>
      </CardFooter>
    </Card>
  );
}
