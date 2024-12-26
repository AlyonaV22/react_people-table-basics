import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Person } from '../../types/Person';
import cn from 'classnames';

enum Properties {
  Name = 'Name',
  Sex = 'Sex',
  Born = 'Born',
  Died = 'Died',
  Mother = 'Mother',
  Father = 'Father',
}

interface Props {
  tablePeople: Person[];
}

export const PeopleTable: React.FC<Props> = props => {
  const { tablePeople } = props;

  const { slug: prevSlug } = useParams();

  const findMotherAndFather = (nameOfParent: string | null): Person | null => {
    return tablePeople.find(person => person.name === nameOfParent) || null;
  };

  const selectedPeople = tablePeople.map(person => {
    return {
      ...person,
      father: findMotherAndFather(person.fatherName),
      mother: findMotherAndFather(person.motherName),
    };
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(Properties).map((proper, index) => (
            <th key={index}>{proper}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {selectedPeople.map(person => {
          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': person.slug === prevSlug,
              })}
            >
              <td>
                <NavLink
                  to={`/people/${person.slug}`}
                  className={cn({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </NavLink>
              </td>

              <td>{person.sex === 'm' ? 'm' : 'f'}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <NavLink
                    to={`/people/${person.mother.slug}`}
                    className="has-text-danger"
                  >
                    {person.mother.name}
                  </NavLink>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {person.father ? (
                  <NavLink to={`/people/${person.father.slug}`}>
                    {person.father.name}
                  </NavLink>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
