import React from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types/Person';
import cn from 'classnames';

interface Props {
  person: Person;
  prevSlug: string;
}

export const PersonLink: React.FC<Props> = ({ person, prevSlug }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const isSelected = slug === prevSlug;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={cn({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <NavLink to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </NavLink>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <NavLink to={`/people/${father.slug}`}>{father.name}</NavLink>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
