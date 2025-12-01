-- Sample data for testing

INSERT INTO plans (title) VALUES
  ('Weekly Shopping'),
  ('Project Kickoff'),
  ('Fitness Goals');

INSERT INTO todos (plan_id, text, done) VALUES
  (1, 'Buy groceries', false),
  (1, 'Check pantry items', false),
  (2, 'Schedule team meeting', false),
  (2, 'Prepare presentation slides', true),
  (3, 'Morning jog', false),
  (3, 'Evening stretching routine', false);

INSERT INTO notes (plan_id, text) VALUES
  (1, 'Bring reusable bags'),
  (1, 'Look for organic produce'),
  (2, 'Discuss Q1 goals'),
  (2, 'Review budget allocation'),
  (3, 'Target: 3x per week'),
  (3, 'Mix cardio and strength training');
