aws --endpoint-url http://127.0.0.1:8080 rds-data execute-statement --resource-arn "arn:aws:rds:us-east-1:123456789012:cluster:dummy" --sql "DROP TABLE IF EXISTS message" --secret-arn "arn:aws:secretsmanager:us-east-1:123456789012:secret:dummy" --database test
aws --endpoint-url http://127.0.0.1:8080 rds-data execute-statement --resource-arn "arn:aws:rds:us-east-1:123456789012:cluster:dummy" --sql "CREATE TABLE message (id int AUTO_INCREMENT, contents varchar(256), PRIMARY KEY (id))" --secret-arn "arn:aws:secretsmanager:us-east-1:123456789012:secret:dummy" --database test
aws --endpoint-url http://127.0.0.1:8080 rds-data execute-statement --resource-arn "arn:aws:rds:us-east-1:123456789012:cluster:dummy" --sql "truncate table message" --secret-arn "arn:aws:secretsmanager:us-east-1:123456789012:secret:dummy" --database test


