import {ObjectId} from "mongodb";
import {$inner_join} from "../../server_base/database-functions/ViewUtils";
import {SCHEMA_TYPE} from "../../schemas/SchemaTypes";

export const $match_test_project = (testproject: string) => ({
    $match: {
        _id: new ObjectId(testproject),
    },
})

export const $match_testset = (testsets: string[], fieldName = "testset") => ([
    $inner_join(SCHEMA_TYPE.TTV2_TEST_SUITE, "_id", "testProject", "testsuite"),
    $inner_join(
        SCHEMA_TYPE.TTV2_TEST_SET,
        "testsuite",
        "tpid",
        fieldName,
        true,
    ),
    {
        $match: testsets.length ? ({
            [`${fieldName}._id`]: {$in: testsets.map((ts) => new ObjectId(ts))},
            [`${fieldName}.syncFlag`]: true
        }) : ({
            [`${fieldName}.syncFlag`]: true
        })
    }])
