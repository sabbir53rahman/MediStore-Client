import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "better-auth";

type Props = {
  user: User;
  hideName?: boolean;
  badge?: React.ReactNode;
};

export const TableUserInfo = ({ user, hideName = false, badge }: Props) => {
  const name = user.name;
  const email = user.email;

  const displayName = name.trim().length > 0 ? name : email;

  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const getInitialsName = (user: User) => {
    const name = user.name?.length > 0 ? user.name?.charAt(0) : "U";
    return name.toUpperCase();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);

    toast.success("Copied to clipboard");
  };

  return (
    <Popover>
      <PopoverTrigger
        className="flex cursor-pointer items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {!hideName && (
            <p
              className="flex shrink-0 items-center gap-1 font-medium"
              title={displayName}
            >
              {truncateText(displayName)} {badge}
            </p>
          )}
          <p className="text-xs">{user.email}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-80 items-start gap-3">
        <Avatar className="border-border size-8 border 2xl:size-12">
          <AvatarImage src={user.image || ""} alt={displayName} />
          <AvatarFallback className="text-lg font-medium">
            {getInitialsName(user)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{displayName}</p>
          <p
            className="text-muted-foreground hover:bg-accent w-fit cursor-pointer rounded px-1 py-0.5 text-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(user.id);
            }}
            title="Click to copy username"
          >
            ID: {user.id?.slice(0, 10)}...
          </p>
          <p
            className="hover:bg-accent w-fit cursor-pointer rounded px-1 py-0.5 text-sm transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(user.email);
            }}
            title="Click to copy email"
          >
            {user.email}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
