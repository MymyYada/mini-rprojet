import { DateTime } from "luxon";
import React from "react";
import Image from "../../assets/character.png";
import { CharacterProps } from "../CharacterList/types";

export const Header = ({
  name,
  rank,
  available,
  lastFight,
}: CharacterProps) => {
  return (
    <div className="w-full flex items-center justify-between p-6 space-x-6">
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3">
          <h3 className="text-gray-900 text-sm font-medium truncate">{name}</h3>
          <span className="flex-shrink-0 inline-block px-2 py-0.5 text-gray-800 text-xs font-medium bg-gray-100 rounded-full">
            {`Lvl ${rank}`}
          </span>
          {available && (
            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              Disponible
            </span>
          )}
        </div>
        <p className="mt-1 text-gray-500 text-sm truncate">
          {`Dernier combat: ${lastFight.toLocaleString(DateTime.DATE_SHORT)}`}
        </p>
      </div>
      <img className="w-8 h-8 flex-shrink-0" src={Image} alt="" />
    </div>
  );
};

export const Body = ({
  skill_pts,
  children,
}: React.PropsWithChildren<{ skill_pts: CharacterProps["skill_pts"] }>) => {
  return (
    <div className="-mt-px flex divide-x divide-gray-200">
      <div className="w-full flex flex-col px-6 py-4">
        {/* <Stat label={`Exp. ${skill_pts}`} icon={icons.stat.skill_pts} /> */}
        {children}
      </div>
    </div>
  );
};

export const Footer = ({
  children,
}: React.PropsWithChildren<React.ReactNode>) => {
  return <div className="-mt-px flex divide-x divide-gray-200">{children}</div>;
};

const Card = ({ children }: React.PropsWithChildren<React.ReactNode>) => {
  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      {children}
    </li>
  );
};

export default Card;
