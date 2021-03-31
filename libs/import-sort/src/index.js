const dg3 = (imported) => imported.moduleName.startsWith('@dg3');

module.exports = ({
  and,
  not,
  hasNoMember,
  isRelativeModule,
  isAbsoluteModule,
  moduleName,
  alias,
  naturally,
  unicode,
  dotSegmentCount,
}) => [
  // import 'foo'
  { match: and(hasNoMember, isAbsoluteModule) },
  { separator: true },

  // import './foo'
  { match: and(hasNoMember, isRelativeModule) },
  { separator: true },

  // import … from 'foo';
  {
    match: and(isAbsoluteModule, not(dg3)),
    sort: moduleName(naturally),
    sortNamedMembers: alias(unicode),
  },
  { separator: true },

  // import … from '@dg3/…';
  {
    match: and(isAbsoluteModule, dg3),
    sort: moduleName(naturally),
    sortNamedMembers: alias(unicode),
  },

  // import … from './foo';
  // import … from '../foo';
  {
    match: isRelativeModule,
    sort: [dotSegmentCount, moduleName(naturally)],
    sortNamedMembers: alias(unicode),
  },
  { separator: true },
];
