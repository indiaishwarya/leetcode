# Write your MySQL query statement below
select user_id, name, mail from users WHERE REGEXP_LIKE(
    mail,
    '^[A-Za-z][A-Za-z0-9_.-]*@leetcode\\.com$',
    'c'  -- case-sensitive
);
