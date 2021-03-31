docker exec -it dg_pg bash
psql -h localhost -p 5432 -U postgres -d gui

select \* from reports ;
DELETE FROM reports where id = 2;
select report_config ->> 'foo' from reports ;

with modules as (SELECT module, json_agg(json_build_object('id',id, 'name', name, 'author', author)) as reports FROM reports GROUP BY module)
SELECT json_object_agg(module,reports) from modules;

with modules as (SELECT module, jsonb_agg(jsonb_build_object('id',id, 'name', name, 'author', author)) as reports FROM reports GROUP BY module)
SELECT jsonb_pretty(jsonb_object_agg(module,reports)) from modules;

insert into saved_filters(saved_filter, author, name, description, visibility, users) values ('{"filter": {"place": "blabla"}}','PAVL','BlaBla','It is gonna be a great filter',ARRAY['PLAC_VIEW', 'PLAC_USER','PLAC_ADMIN'], ARRAY['SYSTEM']);

insert into exported_files(filename,created_at, username,export_file,task_id) values ('odecty',cast('2019-10-31T23:49:17Z' as TIMESTAMP),'6c616ef3-699b-4956-8b62-0189f21803d0', pg_read_file('/var/lib/pgsql/13/odecty.csv')::bytea, '1234');
insert into exported_files(filename,created_at, username,export_file,task_id) values ('odecty',cast('2019-10-31T23:49:17Z' as TIMESTAMP),'d5f094f1-d53b-4218-b46c-35c7ab7d3f1f', pg_read_file('/var/lib/pgsql/13/odecty.csv')::bytea, '1234');
insert into exported_files(filename,created_at, username,export_file,task_id) values ('odecty2',cast('2019-10-31T23:49:17Z' as TIMESTAMP),'d5f094f1-d53b-4218-b46c-35c7ab7d3f1f', pg_read_file('/var/lib/pgsql/13/odecty.csv')::bytea, '123456');
