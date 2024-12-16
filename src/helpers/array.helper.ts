import _ from 'lodash';

export const mergeAndRemoveDuplicates = (arrays: string[][][]): string[][] => {
  const steps = _.max(_.map(arrays, 'length'));

  const list = _.map(new Array(steps), (o, i) => {
    return _.uniq(
      _.flatten(
        _.map(arrays, (array) => {
          return array[i] ?? [];
        }),
      ),
    );
  });
  return list;
};
