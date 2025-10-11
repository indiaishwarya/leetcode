# Write your MySQL query statement below
select e1.name from Employee as e1 join employee as e2 on e2.managerId = e1.id group by e1.id, e1.name having count(*) >= 5;
